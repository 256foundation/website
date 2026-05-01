import { MDXRemote } from 'next-mdx-remote/rsc'

interface PostBodyProps {
  content: string
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className="newsroom-body text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-none">
      <MDXRemote source={content} />
    </div>
  )
}
