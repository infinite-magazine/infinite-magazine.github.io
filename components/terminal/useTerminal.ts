import { useState, useCallback } from 'react';

interface UseTerminalOptions {
  onCommand?: (command: string) => void;
}

export const useTerminal = (options: UseTerminalOptions = {}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleCommand = useCallback(
    (command: string) => {
      if (command.trim()) {
        setHistory((prev) => [...prev, `> ${command}`]);
        options.onCommand?.(command);
        setInput('');
      }
    },
    [options]
  );

  const addToHistory = useCallback((text: string) => {
    setHistory((prev) => [...prev, text]);
  }, []);

  return {
    history,
    input,
    setInput,
    handleCommand,
    addToHistory,
  };
};
