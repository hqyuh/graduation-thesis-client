import React from 'react'

export default function TrashIcon(props: any) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect opacity="0.4" width="36" height="36" rx="10" fill="#117DB9"/>
    <path d="M23 12H28V14H26V27C26 27.2652 25.8946 27.5196 25.7071 27.7071C25.5196 27.8946 25.2652 28 25 28H11C10.7348 28 10.4804 27.8946 10.2929 27.7071C10.1054 27.5196 10 27.2652 10 27V14H8V12H13V9C13 8.73478 13.1054 8.48043 13.2929 8.29289C13.4804 8.10536 13.7348 8 14 8H22C22.2652 8 22.5196 8.10536 22.7071 8.29289C22.8946 8.48043 23 8.73478 23 9V12ZM15 17V23H17V17H15ZM19 17V23H21V17H19ZM15 10V12H21V10H15Z" fill="white"/>
    </svg>
    
  )
}
