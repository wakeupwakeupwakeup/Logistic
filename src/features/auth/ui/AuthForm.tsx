'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/components/ui/input'
import { Button } from '@/shared/ui/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shared/ui/components/ui/card'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const errorMap = {
    Unauthorized: 'Неверный логин или пароль',
}

export function AuthForm() {
    const [error, setError] = useState<string>('')
    const form = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
    })

    const router = useRouter()

    async function onSubmit(data) {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: data.login,
                    password: data.password,
                }),
            })

            if (response.ok) {
                router.push('/home')
            } else {
                setError(errorMap[response.statusText])
            }
        } catch (error) {
            setError(errorMap[error])
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <Card className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4">
                <CardHeader>
                    <CardTitle>Авторизация</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="auth-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            name="login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Логин</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage>{error}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" form="auth-form">
                        Войти
                    </Button>
                </CardFooter>
            </Card>
        </Form>
    )
}
