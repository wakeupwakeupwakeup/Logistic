'use client'

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/components/ui/table'

type TTask = {
    id: string
    clientName: string
    address: string
    amount: string
    phoneNumber: string
    schedule: string
    info: string
    truck: string
}

const columns: ColumnDef<TTask>[] = [
    {
        accessorKey: 'clientName',
        header: 'Наименование клиента',
    },
    {
        accessorKey: 'address',
        header: 'Адрес',
    },
    {
        accessorKey: 'amount',
        header: 'Количество и объем контейнеров',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Номер телефона для связи',
    },
    {
        accessorKey: 'schedule',
        header: 'График вывоза отходов',
    },
    {
        accessorKey: 'info',
        header: 'Примечание',
    },
    {
        accessorKey: 'truck',
        header: 'Закрепленная машина ',
    },
]

const data = [
    {
        id: '1',
        clientName: 'ООО "Бнал"',
        address: 'ул. Звёздная, д. 1',
        amount: '999',
        phoneNumber: '89520520052',
        schedule: 'Каждые 2 дня',
        info: '-',
        truck: 'о052оо197',
    },
    {
        id: '2',
        clientName: 'ООО "Бнал"',
        address: 'ул. Звёздная, д. 1',
        amount: '999',
        phoneNumber: '89520520052',
        schedule: 'Каждые 2 дня',
        info: '-',
        truck: 'о052оо197',
    },
    {
        id: '3',
        clientName: 'ООО "Бнал"',
        address: 'ул. Звёздная, д. 1',
        amount: '999',
        phoneNumber: '89520520052',
        schedule: 'Каждые 2 дня',
        info: '-',
        truck: 'о052оо197',
    },
    {
        id: '4',
        clientName: 'ООО "Бнал"',
        address: 'ул. Звёздная, д. 1',
        amount: '999',
        phoneNumber: '89520520052',
        schedule: 'Каждые 2 дня',
        info: '-',
        truck: 'о052оо197',
    },
]

export function TasksTable() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="rounded border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
