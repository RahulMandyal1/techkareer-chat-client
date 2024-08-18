import { WelcomeSVG } from "src/assets/svg/welcomeSvg"
import Avatar from "../Avatar"
import { useSelector } from "react-redux"

export default function Welcome() {
  const user = useSelector((state) => state.auth.user) || {}
  return (
    <div className="lg:col-span-2 lg:block bg-white w-full">
      <div className="absolute p-4 right-0 flex gap-4 items-center">
        <div className="flex flex-col gap-4">
          <p className="text-lg">{user?.username}</p>
        </div>

        <Avatar src={user?.profileUrl} />
      </div>
      <div className="pl-5 flex items-center justify-center flex-col h-screen">
        <WelcomeSVG />
        <div className="text-center">
          <h2 className="text-xl text-gray-500">Select a Chat to Start Messaging</h2>
          <p className="text-xl text-gray-500">Work in progress, need more time to complete this.</p>
          <p className="Work in progress, need more time to complete this">
            I had some deliverables at my company, so I didn't get time to complete this.
          </p>
        </div>
      </div>
    </div>
  )
}
