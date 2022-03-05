import * as React from 'react';
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import category from 'app/main/services/controller/category';

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
}));

function Categories() {
  const [categories, setCategories] = useState()
  const [title, setTitle] = useState('')

  useEffect(() => {
    category.list()
      .then(({ data }) => setCategories(data))
      .catch(error => console.log(error))
  }, [])

  const renderHeader = () => {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography className="text-40 my-16 font-700" component="h1">
            Kategoriler
          </Typography>
          <Button color="info" variant="contained" href='/pages/category/create'>Kategori oluştur</Button>
        </div>
        <Typography className="description">
          Tüm kategorileri listeleyebilir, yeni oluşturabilir veya varolanları düzenleyebilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Typography color="text.primary">Kategoriler</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderTable = () => {
    return (
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
            {categories?.map((category) => (
              <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{ color: category.color }}><b>{category.title}</b></TableCell>
                <TableCell>{category.color}</TableCell>
                <TableCell>{new Date(category.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button href={`/pages/category/${category.id}`} color="primary">İncele</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderFilter = () => {
    return (
      <div className='mt-20'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Kategori adı"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </Box>
          <ButtonGroup>
            <Button color="info" variant="contained" onClick={() => getCategories()}>Arama yap</Button>
            <Button color="error" variant="contained">Filtreyi temizle</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="pl-60 pr-60 pt-20 pb-20">
        {renderBreadcrumb()}
        {renderHeader()}
        {/* {renderFilter()} */}
        <div className='mt-20'>
          {renderTable()}
        </div>
      </div>
    </Root>
  );
}

export default Categories;
