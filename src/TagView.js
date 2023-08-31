import React, { useState } from 'react'

const TagView = ({ tag, onUpdate, onAddChild, onUpdateTagName }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState(tag.name)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleNameEdit = () => {
    setEditingName(true)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    onUpdateTagName(tag, newName)
    setEditingName(false)
  }

  const renderChildren = () => {
    if (collapsed) {
      return null
    }
    if (tag.children) {
      return (
        <div className="children">
          {tag.children.map((child) => (
            <TagView
              key={child.name}
              tag={child}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onUpdateTagName={onUpdateTagName}
            />
          ))}
        </div>
      )
    }
    return (
      <div className="data">
        <div className="text">Data</div>
        <input
          type="text"
          value={tag.data}
          onChange={(e) => onUpdate(tag, e.target.value)}
        />
      </div>
    )
  }

  return (
    <div className="tag">
      <div className="tag-header">
        <span className="collapse" onClick={toggleCollapse}>
          {collapsed ? '>' : 'v'}
        </span>
        {editingName ? (
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              autoFocus
            />
          </form>
        ) : (
          <span className="tag-name" onClick={handleNameEdit}>
            {newName}
          </span>
        )}
        <button onClick={() => onAddChild(tag.name)}>Add Child</button>
      </div>
      {renderChildren()}
    </div>
  )
}

export default TagView
