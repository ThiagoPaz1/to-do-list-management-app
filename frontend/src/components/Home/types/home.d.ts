export type EditTaskModalData = {
  id: string
  title: string
  description: string
}

export type DeleteTaskModalData = Omit<EditTaskModalData, 'description'>