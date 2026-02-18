
"use client";

import { useState } from "react";
import { NavBar } from "@/components/layout/nav-bar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateSalesPitch, type GenerateSalesPitchOutput } from "@/ai/flows/generate-sales-pitch-flow";
import { Loader2, Send, Sparkles, User, Box, MessageSquare, ListCheck, Quote } from "lucide-react";

export default function PitchesPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSalesPitchOutput | null>(null);

  const [formData, setFormData] = useState({
    customerDetails: "",
    productDetails: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateSalesPitch(formData);
      setResult(data);
    } catch (error) {
      console.error("Error generating pitch:", error);
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/20">
              <Send className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-headline text-3xl font-bold text-primary">Intelligent Pitch Creation</h1>
              <p className="text-muted-foreground">Personalized sales messaging powered by Groq AI</p>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1fr,2fr]">
            {/* Form Section */}
            <div className="space-y-6">
              <Card className="border-accent/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">Pitch Context</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-accent" /> Prospect Details
                      </Label>
                      <Textarea
                        id="customer"
                        placeholder="e.g. Fortune 500 IT Director facing scalability issues..."
                        required
                        className="min-h-[100px]"
                        value={formData.customerDetails}
                        onChange={(e) => setFormData({ ...formData, customerDetails: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product" className="flex items-center gap-2">
                        <Box className="h-4 w-4 text-accent" /> Solution Details
                      </Label>
                      <Textarea
                        id="product"
                        placeholder="Key features, pricing, or USP of your product..."
                        required
                        className="min-h-[100px]"
                        value={formData.productDetails}
                        onChange={(e) => setFormData({ ...formData, productDetails: e.target.value })}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Drafting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Craft Perfect Pitch
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
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                  {/* Elevator Pitch */}
                  <Card className="overflow-hidden shadow-md">
                    <CardHeader className="bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <CardTitle className="font-headline text-xl">30-Second Elevator Pitch</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="relative rounded-xl bg-background border p-6 italic text-lg text-primary leading-relaxed">
                        <Quote className="absolute -left-3 -top-3 h-8 w-8 text-secondary" />
                        &ldquo;{result.elevatorPitch}&rdquo;
                      </div>
                    </CardContent>
                  </Card>

                  {/* Value Prop */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">Value Proposition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{result.valueProposition}</p>
                    </CardContent>
                  </Card>

                  {/* Differentiators */}
                  <Card className="shadow-sm">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <ListCheck className="h-5 w-5 text-accent" />
                        <CardTitle className="font-headline text-xl">Key Differentiators</CardTitle>
                      </div>
                      <CardDescription>What sets your solution apart</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line">
                        {result.keyDifferentiators}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="flex h-full min-h-[400px] flex-col items-center justify-center bg-secondary/20 border-dashed">
                  <div className="text-center">
                    <Send className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                    <h3 className="font-headline text-lg font-medium text-muted-foreground">No Pitch Crafted</h3>
                    <p className="text-sm text-muted-foreground/60">Provide prospect and product info to begin</p>
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
