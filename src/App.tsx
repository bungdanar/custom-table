import CustomCard from './components/custom-card/CustomCard'
import ClientSideTable from './components/custom-table/ClientSideTable'

function App() {
  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <CustomCard>
            <ClientSideTable />
          </CustomCard>
        </div>
      </div>
    </div>
  )
}

export default App
