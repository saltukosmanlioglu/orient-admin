import * as React from 'react';
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import category from 'app/main/services/controller/category';
import subCategory from 'app/main/services/controller/sub-category';
import NoContent from 'app/main/components/no-content';

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

function SubCategories() {
  const [subCategories, setSubCategories] = useState()
  const [categories, setCategories] = useState()

  useEffect(() => {
    category.list()
      .then(({ data }) => setCategories(data))
      .catch(error => console.log(error))
    subCategory.list()
      .then(({ data }) => setSubCategories(data))
      .catch(error => console.log(error))
  }, [])

  const renderHeader = () => {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography className="text-40 my-16 font-700" component="h1">
            Alt kategoriler
          </Typography>
          <Button color="info" variant="contained" href='/pages/sub-category/create'>Alt kategori oluştur</Button>
        </div>
        <Typography className="description">
          Tüm alt kategorileri listeleyebilir, yeni oluşturabilir veya varolanları düzenleyebilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Typography color="text.primary">Alt kategoriler</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderTable = () => {
    return subCategories && subCategories.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Alt kategori adı</TableCell>
              <TableCell>Alt kategori rengi</TableCell>
              <TableCell>Bağlı olduğu kategori</TableCell>
              <TableCell>Oluşturulma tarihi</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategories?.map((subCategory) => (
              <TableRow key={subCategory.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{ color: subCategory.color }}><b>{subCategory.title}</b></TableCell>
                <TableCell>{subCategory.color}</TableCell>
                <TableCell>{subCategory.categoryId}</TableCell>
                <TableCell>{new Date(subCategory.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button href={`/pages/sub-category/${subCategory.id}`} color="primary">İncele</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : <NoContent message="Alt kategori verisi bulunamadı" />
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="pl-60 pr-60 pt-20 pb-20">
        {renderBreadcrumb()}
        {renderHeader()}
        <div className='mt-20'>
          {renderTable()}
        </div>
      </div>
    </Root>
  );
}

export default SubCategories;
