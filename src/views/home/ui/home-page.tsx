import { TasksTable } from '@/features/tasks'

export default function HomePage() {
    return (
        <div className="flex flex-col gap-4">
            <h1>Задания на 10.10.2024</h1>
            <TasksTable />
        </div>
    )
}
