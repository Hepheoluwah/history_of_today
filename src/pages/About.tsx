import { ArrowLeftIcon, ExternalLinkIcon, HeartIcon, GithubIcon, GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Rich Historical Data",
      description: "Powered by Wikipedia's comprehensive On This Day API with events, births, and deaths from throughout history.",
      icon: "📚"
    },
    {
      title: "Beautiful Design",
      description: "Elegant interface with smooth animations, timeline visualization, and responsive design for all devices.",
      icon: "🎨"
    },
    {
      title: "Smart Search",
      description: "Find specific events by year, person, or keyword with our intelligent search functionality.",
      icon: "🔍"
    },
    {
      title: "Favorites System",
      description: "Save your favorite historical events and access them anytime with our persistent favorites feature.",
      icon: "❤️"
    },
    {
      title: "Dark Mode",
      description: "Switch between light, dark, and system themes for comfortable viewing in any environment.",
      icon: "🌙"
    },
    {
      title: "Mobile Optimized",
      description: "Fully responsive design with touch-friendly interactions optimized for mobile devices.",
      icon: "📱"
    }
  ];

  const techStack = [
    { name: "React 18", description: "Modern UI library" },
    { name: "TypeScript", description: "Type-safe development" },
    { name: "Vite", description: "Fast build tool" },
    { name: "Tailwind CSS", description: "Utility-first styling" },
    { name: "shadcn/ui", description: "Beautiful components" },
    { name: "React Query", description: "Data fetching" },
    { name: "React Router", description: "Client-side routing" },
    { name: "Wikipedia API", description: "Historical data source" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/')}
              className="glass"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to History
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              About <span className="text-historical">History of Today</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Discover the fascinating events that shaped our world. Built with modern web technologies 
              and powered by Wikipedia's comprehensive historical database.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Mission */}
        <section className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                History of Today is designed to make historical knowledge more accessible and engaging. 
                By combining Wikipedia's vast historical database with modern web technologies, we create 
                an intuitive platform that helps users discover the fascinating events, births, and deaths 
                that occurred on any given day throughout history.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                Our goal is to inspire curiosity about the past and provide a beautiful, educational 
                experience that makes learning about history both enjoyable and effortless.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="event-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Built With</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="text-center p-4">
                    <Badge variant="secondary" className="mb-2">{tech.name}</Badge>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Source */}
        <section className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Data Source</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All historical data is provided by the Wikimedia Foundation through their 
                "On This Day" API. This ensures accuracy, reliability, and comprehensive coverage 
                of historical events from around the world.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="inline-flex items-center gap-1">
                  <GlobeIcon className="w-3 h-3" />
                  Wikipedia
                </Badge>
                <Badge variant="outline" className="inline-flex items-center gap-1">
                  <ExternalLinkIcon className="w-3 h-3" />
                  Wikimedia API
                </Badge>
                <Badge variant="outline">Open Source</Badge>
                <Badge variant="outline">Free to Use</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Open Source */}
        <section className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                History of Today is an open-source project. We believe in transparency, 
                community collaboration, and making educational tools freely available to everyone.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="https://github.com/yourusername/history-of-today" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/yourusername/history-of-today/issues" target="_blank" rel="noopener noreferrer">
                    Report Issue
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Credits */}
        <section className="mb-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Credits & Acknowledgments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">
                    <strong>Wikipedia & Wikimedia Foundation</strong> - For providing comprehensive historical data
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">
                    <strong>shadcn/ui</strong> - For the beautiful component library
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">
                    <strong>Vercel</strong> - For the amazing development experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">
                    <strong>React Team</strong> - For the incredible framework
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
