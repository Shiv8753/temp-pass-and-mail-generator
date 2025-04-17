
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Check } from 'lucide-react';
import { generatePassword, generateEmail } from '@/utils/generators';
import { toast } from 'sonner';

interface GeneratorFormProps {
  onEmailGenerated: (email: string) => void;
}

const GeneratorForm = ({ onEmailGenerated }: GeneratorFormProps) => {
  // Password settings
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  
  // Generated values
  const [password, setPassword] = useState(() => 
    generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols)
  );
  const [email, setEmail] = useState(() => generateEmail());
  
  // Copy button states
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Generate new password based on current settings
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
    setPasswordCopied(false);
  };

  // Generate new email
  const handleGenerateEmail = () => {
    const newEmail = generateEmail();
    setEmail(newEmail);
    setEmailCopied(false);
    onEmailGenerated(newEmail);
    toast.success("New email generated!");
  };

  // Copy password to clipboard
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setPasswordCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  // Copy email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setEmailCopied(false), 2000);
    onEmailGenerated(email);
  };

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      {/* Password Generator Section */}
      <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Password Generator</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-300">Password Length: {passwordLength}</label>
            </div>
            <Slider 
              value={[passwordLength]} 
              min={6} 
              max={32} 
              step={1} 
              onValueChange={(value) => setPasswordLength(value[0])} 
              className="py-4"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="uppercase" 
                checked={includeUppercase} 
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)} 
              />
              <label htmlFor="uppercase" className="text-sm text-gray-300">Uppercase Letters</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lowercase" 
                checked={includeLowercase} 
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)} 
              />
              <label htmlFor="lowercase" className="text-sm text-gray-300">Lowercase Letters</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="numbers" 
                checked={includeNumbers} 
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)} 
              />
              <label htmlFor="numbers" className="text-sm text-gray-300">Numbers</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="symbols" 
                checked={includeSymbols} 
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)} 
              />
              <label htmlFor="symbols" className="text-sm text-gray-300">Special Characters</label>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Input 
              value={password} 
              readOnly 
              className="pr-12 font-mono bg-black/30 border-gray-700 text-white" 
            />
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleCopyPassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
            >
              {passwordCopied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
          <Button onClick={handleGeneratePassword} variant="secondary">
            <RefreshCw size={16} className="mr-2" />
            Generate
          </Button>
        </div>
      </div>
      
      {/* Email Generator Section */}
      <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Email Generator</h2>
        
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Input 
              value={email} 
              readOnly 
              className="pr-12 font-mono bg-black/30 border-gray-700 text-white" 
            />
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleCopyEmail}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
            >
              {emailCopied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
          <Button onClick={handleGenerateEmail} variant="secondary">
            <RefreshCw size={16} className="mr-2" />
            Generate
          </Button>
        </div>
        
        <p className="text-sm text-gray-400">
          Click "Generate" to create a new random email address. 
          This email address can be used for account signups and verification.
        </p>
      </div>
    </div>
  );
};

export default GeneratorForm;
