interface TableContainerProps {
  children: React.ReactNode
}

export default function TableContainer({ children }: TableContainerProps) {
  return (
    <div className='table-responsive'>
      <table className='table table-bordered table-hover'>{children}</table>
    </div>
  )
}
