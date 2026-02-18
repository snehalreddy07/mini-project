
"use client";

import { useState } from "react";
import { NavBar } from "@/components/layout/nav-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateMarketingCampaign, type GenerateMarketingCampaignOutput } from "@/ai/flows/generate-marketing-campaign-flow";
import { Loader2, Megaphone, Send, Target, Layout, Rocket, Sparkles, CheckCircle2 } from "lucide-react";

export default function CampaignsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateMarketingCampaignOutput | null>(null);

  const [formData, setFormData] = useState({
    productDetails: "",
    targetAudience: "",
    platform: "LinkedIn",
    marketingObjective: "Lead Generation",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateMarketingCampaign(formData);
      setResult(data);
    } catch (error) {
      console.error("Error generating campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Megaphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-headline text-3xl font-bold text-primary">AI Campaign Generator</h1>
              <p className="text-muted-foreground">Develop complete marketing strategies in seconds</p>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
            {/* Form Section */}
            <div className="space-y-6">
              <Card className="border-primary/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product Details</Label>
                      <Textarea
                        id="product"
                        placeholder="What are you selling? Describe key features..."
                        required
                        className="min-h-[120px]"
                        value={formData.productDetails}
                        onChange={(e) => setFormData({ ...formData, productDetails: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Input
                        id="audience"
                        placeholder="e.g. Small business owners in tech"
                        required
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select 
                        value={formData.platform} 
                        onValueChange={(val) => setFormData({ ...formData, platform: val })}
                      >
                        <SelectTrigger id="platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                          <SelectItem value="Google Ads">Google Ads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="objective">Objective</Label>
                      <Select 
                        value={formData.marketingObjective} 
                        onValueChange={(val) => setFormData({ ...formData, marketingObjective: val })}
                      >
                        <SelectTrigger id="objective">
                          <SelectValue placeholder="Select objective" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                          <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                          <SelectItem value="Direct Sales">Direct Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing with LLaMA...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Strategy
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
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid gap-6">
                    {/* Objectives */}
                    <Card className="border-l-4 border-l-primary shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          <CardTitle className="font-headline text-xl">Campaign Objectives</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.campaignObjectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                              <span className="text-sm">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Content Ideas */}
                    <Card className="border-l-4 border-l-accent shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Layout className="h-5 w-5 text-accent" />
                          <CardTitle className="font-headline text-xl">Content Strategy</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {result.contentIdeas.map((idea, i) => (
                            <div key={i} className="rounded-lg bg-secondary/50 p-3 text-sm border border-secondary">
                              {idea}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Ad Copy */}
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Rocket className="h-5 w-5 text-primary" />
                          <CardTitle className="font-headline text-xl">Ad Copy Variations</CardTitle>
                        </div>
                        <CardDescription>Tailored for {formData.platform}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.adCopyVariations.map((copy, i) => (
                          <div key={i} className="rounded-lg border bg-background p-4 shadow-sm italic text-muted-foreground relative">
                            <span className="absolute -left-2 -top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">V{i+1}</span>
                            &ldquo;{copy}&rdquo;
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* CTAs */}
                    <Card className="bg-primary text-primary-foreground shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          <CardTitle className="font-headline text-xl">Recommended CTAs</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {result.callToActionSuggestions.map((cta, i) => (
                            <div key={i} className="rounded-full bg-accent px-4 py-2 text-sm font-bold shadow-sm">
                              {cta}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="flex h-full min-h-[400px] flex-col items-center justify-center bg-secondary/20 border-dashed">
                  <div className="text-center">
                    <Megaphone className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                    <h3 className="font-headline text-lg font-medium text-muted-foreground">No Campaign Generated</h3>
                    <p className="text-sm text-muted-foreground/60">Fill out the form to generate your strategy</p>
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
