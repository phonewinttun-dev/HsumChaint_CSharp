'use server';
import { redirect } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { saveSession, clearSession, readSession } from '@/lib/session';
import type { Login } from '@/lib/types';
export type LoginState = { error: string; identifier?: string; phoneNumber?: string };
export async function loginAction(_previous: LoginState, form: FormData): Promise<LoginState> {
  const identifier = String(form.get('identifier') ?? form.get('phoneNumber') ?? '').trim();
  const password = String(form.get('password') ?? '');
  if (!identifier || !password || identifier.length > 256 || password.length > 256) return { error: 'အီးမေးလ်/ဖုန်းနံပါတ်နှင့် စကားဝှက် မှန်ကန်စွာ ဖြည့်ပါ။', identifier: identifier.slice(0, 256) };
  try {
    const result = await api<Login>('/api/v1/Auth/login', undefined, { identifier, password });
    await saveSession(result.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : 'ဝင်ရောက်၍မရပါ။ Server configuration ကို စစ်ဆေးပါ။', identifier };
  }
  redirect('/dashboard');
}
export async function logoutAction() {
  const session = await readSession();
  if (session) {
    await api('/api/v1/Auth/logout', session.accessToken, { refreshToken: session.refreshToken });
  }
  await clearSession();
  redirect('/login');
}
