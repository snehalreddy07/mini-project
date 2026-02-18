
"use client";

import { useState } from "react";
import { NavBar } from "@/components/layout/nav-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { scoreLeadQualification, type ScoreLeadQualificationOutput } from "@/ai/flows/score-lead-qualification";
import { Loader2, BarChart3, Sparkles, TrendingUp, Info, AlertCircle, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function LeadsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreLeadQualificationOutput | null>(null);

  const [formData, setFormData] = useState({
    budget: "",
    implementationNeeds: "",
    urgency: "Medium Urgency",
    customerDetails: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await scoreLeadQualification(formData);
      setResult(data);
    } catch (error) {
      console.error("Error scoring lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-emerald-500">High Quality</Badge>;
    if (score >= 50) return <Badge className="bg-amber-500">Potential</Badge>;
    return <Badge className="bg-rose-500">Low Quality</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-headline text-3xl font-bold text-primary">Lead Qualification & Scoring</h1>
              <p className="text-muted-foreground">Prioritize your pipeline with AI-driven probability analysis</p>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1fr,1.5fr]">
            {/* Form Section */}
            <div className="space-y-6">
              <Card className="border-primary/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Lead Attributes</CardTitle>
                  <CardDescription>Enter details about the potential customer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Info</Label>
                      <Input
                        id="budget"
                        placeholder="e.g. $50,000 yearly budget"
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="needs">Implementation Needs</Label>
                      <Input
                        id="needs"
                        placeholder="e.g. Immediate rollout for 50 users"
                        required
                        value={formData.implementationNeeds}
                        onChange={(e) => setFormData({ ...formData, implementationNeeds: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Input
                        id="urgency"
                        placeholder="e.g. High urgency, Q4 goal"
                        required
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details">Other Context (Optional)</Label>
                      <Textarea
                        id="details"
                        placeholder="Company size, industry, or specific pain points..."
                        className="min-h-[80px]"
                        value={formData.customerDetails}
                        onChange={(e) => setFormData({ ...formData, customerDetails: e.target.value })}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Scoring Lead...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Calculate Lead Score
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {result ? (
                <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                  {/* Score Card */}
                  <Card className="overflow-hidden border-2 shadow-xl">
                    <div className="bg-primary px-6 py-4 flex justify-between items-center text-primary-foreground">
                      <h3 className="font-headline font-bold">Qualification Assessment</h3>
                      <ShieldCheck className="h-5 w-5 opacity-50" />
                    </div>
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">
                        <div className="text-center">
                          <div className={`text-6xl font-headline font-bold mb-2 ${getScoreColor(result.leadScore)}`}>
                            {result.leadScore}
                          </div>
                          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Lead Score</div>
                          {getScoreBadge(result.leadScore)}
                        </div>
                        <div className="h-px w-full bg-border md:h-20 md:w-px" />
                        <div className="text-center w-full max-w-[200px]">
                          <div className="text-4xl font-headline font-bold text-primary mb-2">
                            {result.probabilityOfConversion}%
                          </div>
                          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Closing Probability</div>
                          <Progress value={result.probabilityOfConversion} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reasoning Card */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-accent" />
                        <CardTitle className="font-headline text-xl">AI Reasoning</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-secondary/30 p-4 text-muted-foreground leading-relaxed italic">
                        {result.reasoning}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card className="bg-secondary/20 border-accent/20">
                    <CardContent className="p-4 flex items-start gap-4">
                      <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                      <div className="text-sm">
                        <span className="font-bold text-primary block mb-1">Sales Tip:</span>
                        Based on the {result.leadScore} score, we recommend {result.leadScore > 70 ? "immediate direct outreach via phone" : "nurturing through a custom email sequence"} to maximize conversion efficiency.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="flex h-full min-h-[400px] flex-col items-center justify-center bg-secondary/20 border-dashed">
                  <div className="text-center">
                    <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                    <h3 className="font-headline text-lg font-medium text-muted-foreground">No Scoring Data</h3>
                    <p className="text-sm text-muted-foreground/60">Analyze lead attributes to see potential conversion rates</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
