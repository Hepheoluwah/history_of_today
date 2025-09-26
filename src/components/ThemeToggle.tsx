import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-4 h-4" />;
      case 'dark':
        return <MoonIcon className="w-4 h-4" />;
      default:
        return <MonitorIcon className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm" className="glass">
          {getThemeIcon()}
          <span className="ml-2 hidden sm:inline">{getThemeLabel()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="end">
        <div className="space-y-1">
          <Button
            variant={theme === 'light' ? 'default' : 'ghost'}
            size="sm"
            className="w-full justify-start"
            onClick={() => setTheme('light')}
          >
            <SunIcon className="w-4 h-4 mr-2" />
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'ghost'}
            size="sm"
            className="w-full justify-start"
            onClick={() => setTheme('dark')}
          >
            <MoonIcon className="w-4 h-4 mr-2" />
            Dark
          </Button>
          <Button
            variant={theme === 'system' ? 'default' : 'ghost'}
            size="sm"
            className="w-full justify-start"
            onClick={() => setTheme('system')}
          >
            <MonitorIcon className="w-4 h-4 mr-2" />
            System
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
