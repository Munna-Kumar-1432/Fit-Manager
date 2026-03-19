import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050B14] p-4">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-black tracking-normal flex items-center justify-center gap-2" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
                    <span className="text-white">POWERFIT</span>
                    <span className="text-[#FF3B3F]">LOGIN</span>
                </h1>
            </div>

            <div className="w-full max-w-[420px]">
                <SignIn
                    appearance={{
                        variables: {
                            colorBackground: 'white',
                            colorText: '#000000',
                            colorPrimary: '#1E40AF',
                            colorInputBackground: '#EFF3FA',
                            colorInputText: '#000000',
                        },
                        elements: {
                            rootBox: "w-full",
                            card: "bg-white shadow-xl rounded-2xl w-full p-2",
                            headerTitle: "text-2xl font-bold text-black",
                            headerSubtitle: "text-slate-500 text-[15px]",
                            formButtonPrimary: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3.5 rounded-lg uppercase tracking-wide transition-all shadow-md mt-2",
                            formFieldInput: "bg-[#EFF3FA] border-none text-black focus:ring-2 focus:ring-[#1d4ed8] rounded-lg px-4 py-3 outline-none transition-all placeholder:text-slate-400 text-base",
                            formFieldLabel: "text-black font-semibold text-sm normal-case tracking-normal mb-1.5",
                            dividerLine: "bg-gray-200",
                            dividerText: "text-gray-500 text-sm lowercase bg-white px-3 font-normal",
                            socialButtonsBlockButton: "bg-white border border-gray-200 shadow-sm text-black hover:bg-gray-50 rounded-lg py-3 font-bold text-sm",
                            socialButtonsProviderIcon: "w-5 h-5",
                            footerActionText: "text-gray-500 text-[15px]",
                            footerActionLink: "text-[#1d4ed8] font-medium hover:underline text-[15px]",
                            identityPreviewText: "text-black font-medium",
                            identityPreviewEditButton: "text-slate-500 hover:text-black",
                            logoBox: "hidden",
                        }
                    }}
                />
            </div>
        </div>
    );
}
