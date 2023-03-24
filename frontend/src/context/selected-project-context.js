import React, { createContext, useContext, useState } from 'react'
import { useTasks } from '../hooks'

export const SelectedProjectContext = createContext()
export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState('INBOX')
  const { tasks, forceUpdateTasks } = useTasks(selectedProject)
  return (
    <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject, tasks, forceUpdateTasks }}>
      {children}
    </SelectedProjectContext.Provider>
  )
}

export const useSelectedProjectValue = () => useContext(SelectedProjectContext)
