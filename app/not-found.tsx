import { CardWrapper } from '@/components/auth/card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-200 dark:from-gray-950 dark:to-gray-700">
      <div className='h-screen w-screen flex justify-center items-center'>
        <CardWrapper
          headerLabel="Oops! Something went wrong!"
          backButtonHref="/"
          backButtonLabel="Go Back"
        >
          <div className='w-full flex justify-center items-center flex-col'>
            <ExclamationTriangleIcon height={20} width={20} className='text-destructive' />
          </div>
        </CardWrapper>
      </div>
    </div>
  )
}