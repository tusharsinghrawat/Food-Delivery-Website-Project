import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('login');

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  /* ===============================
     PREFILL LOGIN EMAIL
  ============================== */
  useEffect(() => {
    const savedEmail = localStorage.getItem('last_signup_email');
    if (savedEmail) {
      setLoginData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
    }
  }, []);

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(
      loginData.email,
      loginData.password
    );

    setIsLoading(false);

    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'Login successful',
      });

      localStorage.removeItem('last_signup_email');
      navigate('/'); // ✅ HOME
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await signup(
      signupData.name,
      signupData.email,
      signupData.password
    );

    setIsLoading(false);

    if (success) {
      toast({
        title: 'Account created',
        description: 'Please login to continue',
      });

      localStorage.setItem(
        'last_signup_email',
        signupData.email
      );

      setActiveTab('login');
      setSignupData({ name: '', email: '', password: '' });
    } else {
      toast({
        title: 'Account already exists',
        description: 'Please login using your password',
      });

      localStorage.setItem(
        'last_signup_email',
        signupData.email
      );

      setLoginData((prev) => ({
        ...prev,
        email: signupData.email,
      }));

      setActiveTab('login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Welcome to FoodExpress
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="pl-10 pr-10"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setShowLoginPassword(!showLoginPassword)
                      }
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </TabsContent>

              {/* SIGNUP */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="pl-10"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showSignupPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="pl-10 pr-10"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setShowSignupPassword(!showSignupPassword)
                      }
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? 'Creating account...'
                      : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AuthPage;
