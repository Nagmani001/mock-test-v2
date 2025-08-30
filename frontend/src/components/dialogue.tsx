import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import axios from "axios"
import { BASE_URL } from "@/config/utils"
import { useAtomValue } from "jotai"
import { answerAtom, testTimerAtom } from "@/atom/atom"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { useState } from "react"

export function DialogDemo({ id }: { id: string | undefined }) {
  const answer = useAtomValue(answerAtom);
  const time = useAtomValue(testTimerAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
              />
            </svg>
            Pause Test
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-2xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">Pause Test</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">Are you sure you want to pause the test? You can resume it later.</p>
          </div>
          <DialogFooter className="flex space-x-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="px-6 py-2 bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={async () => {
                setLoading(true);
                const requiredSolution = answer.map((x: any) => {
                  return {
                    answer: x.answer,
                    status: x.status,
                    questionId: x.id,
                    wordsNumber: x.answer.split(" ").length
                  }
                });
                try {
                  const token = await auth.getToken();
                  // managing state first 
                  await axios.post(`${BASE_URL}/api/v1/test/submit`, {
                    remainingHour: time.hour,
                    remainingMinute: time.minute,
                    remainingSecond: time.second,
                    type: "Paused",
                    testId: id,
                    submittedAt: new Date(),
                    solution: requiredSolution
                  }, {
                    headers: {
                      Authorization: token
                    }
                  });
                  setLoading(false);
                  toast.success("Submitted successfully");
                  alert("submitted successfully");
                  navigate("/tests");
                } catch (err) {
                  console.log(err);
                }
              }}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600"
            >
              {loading ?
                <span className="loading loading-dots loading-lg"></span>
                :
                "Pause Test"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
