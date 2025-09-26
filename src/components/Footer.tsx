import { ExternalLinkIcon, HeartIcon, GithubIcon, TwitterIcon, GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-heading font-semibold mb-3 text-historical">
              History of Today
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover the fascinating events, births, and deaths that shaped our world throughout history. 
              Powered by Wikipedia's comprehensive historical database.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-500" />
              <span>for history enthusiasts</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://en.wikipedia.org/wiki/Wikipedia:On_this_day" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Wikipedia On This Day
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://api.wikimedia.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Wikimedia API
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About This Project
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/yourusername/history-of-today" target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://twitter.com/HistoryOfToday" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://historyoftoday.dev" target="_blank" rel="noopener noreferrer">
                  <GlobeIcon className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Questions or feedback?<br />
              <a 
                href="mailto:contact@historyoftoday.dev" 
                className="text-primary hover:underline"
              >
                Get in touch
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} History of Today. Built with React, TypeScript, and Tailwind CSS.
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Data provided by</span>
            <a 
              href="https://wikimediafoundation.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Wikimedia_Foundation_logo.svg" 
                alt="Wikimedia Foundation" 
                className="w-4 h-4"
              />
              Wikimedia Foundation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
