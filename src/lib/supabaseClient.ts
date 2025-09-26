import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // NEXT_PUBLIC_ 접두사가 붙은 변수는 브라우저에 노출됩니다.
  // 민감한 정보(예: 서비스 역할 키)는 여기에 포함해서는 안 됩니다.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
