import { useState, useEffect } from 'react'
import AdminComponent from '@/components/shared/AdminComponent'
import TitleAdminPanel from '@/components/shared/TitleAdminPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faGhost } from '@fortawesome/free-solid-svg-icons'
import AdminListTable from '@/components/shared/AdminListTable'
import AdminDeleteModal from '@/components/shared/AdminDeleteModal'
import NoData from '@/components/shared/NoData'

import withAuthAdmin from '@/components/withAuthAdmin'

import useSWR from 'swr'
import CategoriesService from '@/services/categories'
import Category from '@/dtos/Category'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryToEdit } from '@/store/modules/admin/category/reducer'
import { useRouter } from 'next/router'

const defaultUrl = '/admin/v1/categories'

import UrlService from '@/util/UrlService'
import { RootState } from '@/store'

const List = () => {
  const [show, setShow] = useState(false)
  const [categoryToRemove, setCategoryToRemove] = useState(0)
  const [url, setUrl] = useState(defaultUrl)

  const { data, error, mutate } = useSWR(url, CategoriesService.index)

  const search = useSelector((state: RootState) => state.search)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    setUrl(
      defaultUrl +
      UrlService.execute({ page: router.query.page, search })
    )
  }, [search, router.query.page])

  const handleShow = (id: number): void => {
    setShow(true)
    setCategoryToRemove(id)
  }

  const handleClose = async (success: boolean): Promise<void> => { 
    setShow(false)

    if (!success) return

    try {
      await CategoriesService.delete(categoryToRemove)
      toast.info('Successfully removed category!')
      mutate()
    } catch (err){
      toast.error('Error removing category!')
      console.log(err)
    }
  }

  const handleEdit = (category: Category): void => {
    dispatch(setCategoryToEdit(category))
    router.push('/Admin/Categories/Edit')
  }

  if (error) {
    toast.error('Error loading categories!')
    console.log(error)
  }

  return (
    <AdminComponent>
      <TitleAdminPanel 
        title="Categories" 
        path="Dashboard > Categories" 
        icon={faGhost} 
        newPath="/Admin/Categories/New"/>

      <AdminDeleteModal handleClose={handleClose} show={show} target="category" />

      {
        data && data.categories && data.categories.length > 0 ? (
          <AdminListTable first_title="Category Name" meta={data.meta}>
            {
              data.categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <div>
                      <FontAwesomeIcon 
                        icon={faEdit} 
                        onClick={() => handleEdit(category)}
                      />
                    </div>
                  </td>

                  <td>
                    <div>
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        onClick={() => handleShow(category.id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </AdminListTable>
        ) : (
          <NoData />
        )
      }
    </AdminComponent>
  )
}

export default withAuthAdmin(List)