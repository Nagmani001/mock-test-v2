import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
// import { DialogDemo } from "./dialogue"

export default function ArenaNav({ title,  }: {
  title: string | undefined,
}) {
  return (
    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="flex items-center">
        <h3 className="text-2xl font-bold text-white tracking-wide">{title || "Test Arena"}</h3>
      </div>
      <div className="flex items-center space-x-6">
        {/*
        <DialogDemo id={id} />
        */}
        <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full py-2 px-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="text-white">
              <SignInButton />
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
