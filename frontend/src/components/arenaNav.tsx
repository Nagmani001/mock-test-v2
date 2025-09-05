import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
// import { DialogDemo } from "./dialogue"

export default function ArenaNav({ title,  }: {
  title: string | undefined,
}) {
  return (
    <div className="flex justify-between items-center p-2 md:p-3 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg h-full">
      <div className="flex items-center min-w-0 flex-1">
        <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide truncate">{title || "Test Arena"}</h3>
      </div>
      <div className="flex items-center space-x-2 md:space-x-6 flex-shrink-0">
        {/*
        <DialogDemo id={id} />
        */}
        <div className="flex items-center space-x-2 md:space-x-4 bg-white/20 backdrop-blur-sm rounded-full py-1 px-2 md:py-2 md:px-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="text-white text-sm md:text-base">
              <SignInButton />
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
