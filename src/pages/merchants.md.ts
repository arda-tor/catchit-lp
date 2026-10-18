import type { APIRoute } from 'astro';
import { merchants } from '../data/merchants';
import { pageToMarkdown, markdownResponse } from '../lib/markdown';

export const GET: APIRoute = () => markdownResponse(pageToMarkdown(merchants));
