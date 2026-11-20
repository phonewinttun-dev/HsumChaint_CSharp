'use client';
import { useActionState, useState } from 'react';
import { Eye, EyeOff, ArrowRight, LoaderCircle } from 'lucide-react';
import { loginAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from './localization';
export function LoginForm() {
  const { t } = useLanguage();
  const [state, action, pending] = useActionState(loginAction, { error: '' });
  const [visible, setVisible] = useState(false);
  return <form action={action} className="login-form">
    <div className="field"><label htmlFor="identifier">{t('အီးမေးလ် သို့မဟုတ် ဖုန်းနံပါတ်')}</label><Input id="identifier" name="identifier" defaultValue={state.identifier ?? state.phoneNumber} type="text" autoComplete="username" placeholder="09xxxxxxxxx သို့မဟုတ် example@mail.com" required maxLength={256} /></div>
    <div className="field"><label htmlFor="password">{t('စကားဝှက်')}</label><div className="password-wrap"><Input id="password" name="password" type={visible ? 'text' : 'password'} autoComplete="current-password" required maxLength={256} /><Button type="button" variant="ghost" size="icon" aria-label={t(visible ? 'စကားဝှက် ဖျောက်ရန်' : 'စကားဝှက် ပြရန်')} onClick={() => setVisible(!visible)}>{visible ? <EyeOff /> : <Eye />}</Button></div></div>
    {state.error && <p role="alert" className="error-message">{state.error}</p>}
    <Button type="submit" size="lg" disabled={pending} className="w-full">{pending ? <LoaderCircle className="animate-spin" /> : null}{t(pending ? 'ဝင်ရောက်နေပါသည်…' : 'အကောင့်ဝင်ရန်')}{!pending && <ArrowRight />}</Button>
  </form>;
}
