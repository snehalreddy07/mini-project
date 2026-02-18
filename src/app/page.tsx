import { NavBar } from "@/components/layout/nav-bar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Send, BarChart3, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const campaignImg = PlaceHolderImages.find(img => img.id === 'campaign-card');
  const pitchImg = PlaceHolderImages.find(img => img.id === 'pitch-card');
  const leadsImg = PlaceHolderImages.find(img => img.id === 'leads-card');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="relative mb-16 overflow-hidden rounded-3xl bg-primary px-8 py-20 text-primary-foreground">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              <span>Cutting-edge AI Intelligence</span>
            </div>
            <h1 className="mb-6 font-headline text-5xl font-bold leading-tight md:text-6xl">
              Transform Your Sales with Tech Sales AI
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Tech Sales AI empowers marketing and sales teams with predictive analytics, 
              automated campaign strategies, and intelligent lead qualification.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/campaigns">Start Generating Campaigns</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/leads">Score Your Leads</Link>
              </Button>
            </div>
          </div>
          {heroImg && (
            <div className="absolute right-0 top-0 hidden h-full w-1/3 opacity-30 mix-blend-overlay lg:block">
              <Image 
                src={heroImg.imageUrl} 
                alt={heroImg.description} 
                fill 
                className="object-cover" 
                data-ai-hint={heroImg.imageHint}
              />
            </div>
          )}
        </section>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-primary/10">
            <div className="relative h-48 w-full overflow-hidden">
              {campaignImg && (
                <Image 
                  src={campaignImg.imageUrl} 
                  alt={campaignImg.description} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={campaignImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <Megaphone className="h-5 w-5" />
                <span className="font-headline font-bold">Campaigns</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">AI Campaign Generator</CardTitle>
              <CardDescription>
                Generate multi-channel strategies, ad copies, and content ideas in seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild className="w-full bg-secondary text-primary hover:bg-secondary/80">
                <Link href="/campaigns" className="flex items-center justify-center gap-2">
                  Launch Generator <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-primary/10">
            <div className="relative h-48 w-full overflow-hidden">
              {pitchImg && (
                <Image 
                  src={pitchImg.imageUrl} 
                  alt={pitchImg.description} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={pitchImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <Send className="h-5 w-5" />
                <span className="font-headline font-bold">Sales Pitches</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Intelligent Pitch Creation</CardTitle>
              <CardDescription>
                Craft high-converting personalized pitches tailored to your specific leads.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild className="w-full bg-secondary text-primary hover:bg-secondary/80">
                <Link href="/pitches" className="flex items-center justify-center gap-2">
                  Draft a Pitch <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-primary/10">
            <div className="relative h-48 w-full overflow-hidden">
              {leadsImg && (
                <Image 
                  src={leadsImg.imageUrl} 
                  alt={leadsImg.description} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={leadsImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5" />
                <span className="font-headline font-bold">Qualification</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Lead Scoring & Analytics</CardTitle>
              <CardDescription>
                Prioritize your pipeline with AI-driven probability assessments and reasoning.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild className="w-full bg-secondary text-primary hover:bg-secondary/80">
                <Link href="/leads" className="flex items-center justify-center gap-2">
                  Analyze Leads <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Section */}
        <section className="mt-16 rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="font-headline text-2xl font-bold text-primary">System Performance</h2>
              <p className="text-muted-foreground">Real-time stats from Tech Sales AI platform</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">0.02s</div>
                <div className="text-xs uppercase text-muted-foreground">Inference Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12k+</div>
                <div className="text-xs uppercase text-muted-foreground">Campaigns Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-xs uppercase text-muted-foreground">Accuracy Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-xs uppercase text-muted-foreground">Enterprise Users</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
