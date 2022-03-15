import { useEffect, useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import NoContent from 'app/main/components/no-content'
import categoryService from 'app/main/services/controller/category'

const Root = styled('div')(({ theme }) => ({
  '& .FaqPage-header': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },

  '& .FaqPage-panel': {
    margin: 0,
    border: 'none',
    '&:before': {
      display: 'none',
    },
    '&:first-of-type': {
      borderRadius: '20px 20px 0 0',
    },
    '&:last-of-type': {
      borderRadius: '0 0 20px 20px',
    },

    '&.Mui-expanded': {
      margin: 'auto',
    },
  },
}))

function Categories() {
  const [categories, setCategories] = useState()
  const [title, setTitle] = useState('')

  useEffect(() => {
    categoryService
      .list()
      .then(({ data }) => {
        const sorted = data.sort((a, b) => (a.order > b.order ? 1 : -1))
        console.log(sorted)
        setCategories(sorted)
      })
      .catch((error) => console.log(error))
  }, [])

  const renderHeader = () => {
    return (
      <>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography className="text-40 my-16 font-700" component="h1">
            Kategoriler
          </Typography>
          <Button
            color="info"
            variant="contained"
            href="/pages/category/create"
          >
            Kategori oluştur
          </Button>
        </div>
        <Typography className="description">
          Tüm kategorileri listeleyebilir, yeni oluşturabilir veya varolanları
          düzenleyebilirsiniz.
        </Typography>
      </>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">
            Anasayfa
          </Button>
          <Typography color="text.primary">Kategoriler</Typography>
        </Breadcrumbs>
      </div>
    )
  }
  const handleMove = useCallback(
    (direction, item, list, setter, serviceMethod) => {
      const index = list.indexOf(item)
      const before = list[index - 1]
      const next = list[index + 1]
      const newList = list.slice()
      if (direction === 'up') {
        newList[index] = before
        newList[index - 1] = item
      } else if (direction === 'down') {
        newList[index] = next
        newList[index + 1] = item
      }
      setter(newList)

      serviceMethod(newList.map((i, index) => ({ id: i.id, order: index })))
    },
    []
  )
  const renderTable = () => {
    return categories && categories.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Kategori adı</TableCell>
              <TableCell>Kategori rengi</TableCell>
              <TableCell>Oluşturulma tarihi</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category, index) => (
              <TableRow
                key={category?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ color: category?.color }}>
                  <b>{category?.title}</b>
                </TableCell>
                <TableCell>{category?.color}</TableCell>
                <TableCell>
                  {new Date(category?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    href={`/pages/category/${category?.id}`}
                    color="primary"
                  >
                    İncele
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={() =>
                      handleMove(
                        'up',
                        category,
                        categories,
                        setCategories,
                        categoryService.reorder
                      )
                    }
                  >
                    Yukarı Taşı
                  </Button>
                  <Button
                    disabled={categories.length - 1 === index}
                    onClick={() =>
                      handleMove(
                        'down',
                        category,
                        categories,
                        setCategories,
                        categoryService.reorder
                      )
                    }
                  >
                    Aşağı Taşı
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <NoContent message="Kategori verisi bulunamadı" />
    )
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="pl-60 pr-60 pt-20 pb-20">
        {renderBreadcrumb()}
        {renderHeader()}
        <div className="mt-20">{renderTable()}</div>
      </div>
    </Root>
  )
}

export default Categories
