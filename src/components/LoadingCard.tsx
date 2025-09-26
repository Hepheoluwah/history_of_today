import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LoadingCard() {
  return (
    <Card className="event-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image skeleton */}
        <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
          <div className="w-full h-full bg-muted shimmer"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 bg-muted rounded shimmer"></div>
                  <div className="h-7 w-20 bg-muted rounded shimmer"></div>
                </div>
                <div className="h-6 w-3/4 bg-muted rounded shimmer"></div>
                <div className="h-6 w-1/2 bg-muted rounded shimmer"></div>
              </div>

              {/* Timeline dot skeleton */}
              <div className="hidden md:flex items-center">
                <div className="timeline-line h-8 mr-4"></div>
                <div className="w-4 h-4 rounded-full bg-muted shimmer"></div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-muted rounded shimmer"></div>
              <div className="h-4 w-full bg-muted rounded shimmer"></div>
              <div className="h-4 w-3/4 bg-muted rounded shimmer"></div>
            </div>

            <div className="h-9 w-24 bg-muted rounded shimmer"></div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}