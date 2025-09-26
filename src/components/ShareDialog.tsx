import { useState } from 'react';
import { format } from 'date-fns';
import { ShareIcon, TwitterIcon, FacebookIcon, LinkIcon, CheckIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  eventCount: number;
}

export function ShareDialog({ open, onOpenChange, date, eventCount }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatDate = format(date, "MMMM d, yyyy");
  const shareText = `Discover what happened on ${formatDate}! Check out ${eventCount} fascinating historical events on History of Today.`;
  const shareUrl = `${window.location.origin}?date=${format(date, 'yyyy-MM-dd')}`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Share link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShareIcon className="w-5 h-5" />
            Share History of Today
          </DialogTitle>
          <DialogDescription>
            Share these fascinating historical events from {formatDate}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social sharing buttons */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(shareUrls.twitter, '_blank')}
            >
              <TwitterIcon className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(shareUrls.facebook, '_blank')}
            >
              <FacebookIcon className="w-4 h-4 mr-2" />
              Share on Facebook
            </Button>
          </div>

          {/* Copy link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
                className="flex-shrink-0"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}