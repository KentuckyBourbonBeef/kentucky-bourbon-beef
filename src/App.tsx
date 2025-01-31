import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          // Try to refresh the session if it exists
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error('Error refreshing session:', error);
            setSession(null);
            navigate('/auth');
          } else {
            console.log('Session refreshed successfully');
            setSession(data.session);
          }
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        setSession(null);
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bourbon-600" />
      </div>
    );
  }

  return (
    <>
      <Outlet context={{ session }} />
      <Toaster />
    </>
  );
}

export default App;