import { type ChangeEvent, type FC, useRef, useState } from 'react'
import { StyledCreatePostWrapper } from './CreatePost.styled.tsx'
import { AccentButton, Avatar } from '@/kit'
import { useAppSelector } from '@/hooks'
import { useCreatePostMutation, useGetMyPostsQuery } from '../../api/posts.api.ts'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BACKEND_URL } from '@/core'

const CreatePost: FC = () => {
    const user = useAppSelector(state => state.auth.user)

    const [files, setFiles] = useState<File[]>([])
    const [filePreviews, setFilePreviews] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [description, setDescription] = useState<string>('')

    const [createPost] = useCreatePostMutation()
    const { refetch: refetchPosts } = useGetMyPostsQuery(null)

    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : []
        setFiles(prevFiles => [...prevFiles, ...selectedFiles])

        selectedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                setFilePreviews(prevPreviews => [...prevPreviews, event.target?.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const handleAttachFile = (): void => {
        fileInputRef.current?.click()
    }

    const handleFinish = async (): Promise<void> => {
        setIsLoading(true)

        if (files.length) {
            const formData = new FormData()
            files.forEach(file => { formData.append('image', file) })

            const { data } = await axios.post<{ urls: string[] }>(`${BACKEND_URL}/upload/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            await createPost({
                files: data.urls,
                description: description.length ? description : null
            }).then(() => {
                toast.success('Пост успешно создан')
                setDescription('')
                setFiles([])
                setFilePreviews([])
                setIsLoading(false)
                void refetchPosts()
            }).catch(() => {
                toast.error('Что-то пошло не так')
            })
        } else {
            await createPost({
                files: [],
                description: description.length ? description : null
            }).then(() => {
                toast.success('Пост успешно создан')
                setDescription('')
                setIsLoading(false)
                void refetchPosts()
            }).catch(() => {
                toast.error('Что-то пошло не так')
            })
        }
    }

    return (
        <StyledCreatePostWrapper>
            <div className="top">
                <Avatar size='small' ava={user.ava} />
                <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                    className="description"
                    placeholder='Что у вас нового?'
                    rows={3}
                />
            </div>
            {filePreviews.length > 0 && (
                <div className='previews'>
                    {filePreviews.map((preview, index) => (
                        <img key={index} className='preview' src={preview} alt={`File preview ${index + 1}`} />
                    ))}
                </div>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
            />
            <div className="buttons-wrapper">
                <AccentButton onClick={handleAttachFile}>Прикрепить файлы</AccentButton>
                <AccentButton onClick={() => { void handleFinish() }} isLoading={isLoading}>Отправить</AccentButton>
            </div>
        </StyledCreatePostWrapper>
    )
}

export default CreatePost
