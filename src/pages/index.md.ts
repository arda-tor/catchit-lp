import type { APIRoute } from 'astro';
import { home } from '../data/home';
import { pageToMarkdown, markdownResponse } from '../lib/markdown';

export const GET: APIRoute = () => markdownResponse(pageToMarkdown(home));
