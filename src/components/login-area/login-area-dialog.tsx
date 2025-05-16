"use client"

import { useAuth } from "@/stores/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { LoginAreaStepEmail } from "./login-area-step-email";
import { LoginAreaSignup } from "./login-area-step-signup";
import { getCookie } from "cookies-next/client";
import { LoginAreaSignin } from "./login-area-step-signin";

type Steps = "EMAIL" | "SIGNUP" | "SIGNIN";

export const LoginAreaDialog = () => {
    const auth = useAuth();

    const [step, setStep] = useState<Steps>("EMAIL");
    const [emailField, setEmailField] = useState('');

    useEffect(() => {
        const token = getCookie('token');
        if (token) auth.setToken(token);
    }, []);

    const handleStepEmail = (hasEmail: boolean, email: string) => {
        setEmailField(email);
        if (hasEmail) {
            setStep('SIGNIN');
        } else {
            setStep('SIGNUP');
        }
    }

    return (
        <Dialog
            open={auth.open}
            onOpenChange={open => auth.setOpen(open)}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {step !== 'EMAIL' &&
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setStep('EMAIL')}
                            >
                                <ArrowLeft className="size-4" />
                            </Button>
                        }

                        {step === 'EMAIL' && "Login / Cadastro"}
                        {step === 'SIGNUP' && "Cadastro"}
                        {step === 'SIGNIN' && "Login"}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {step === 'EMAIL' &&
                        <LoginAreaStepEmail
                            onValidate={handleStepEmail}
                        />
                    }
                    {step === 'SIGNIN' &&
                        <LoginAreaSignin
                            email={emailField}
                        />
                    }
                    {step === 'SIGNUP' &&
                        <LoginAreaSignup
                            email={emailField}
                        />
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}