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

import product from 'app/main/services/controller/product';
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

function Products() {
  const [products, setProducts] = useState()

  useEffect(() => {
    product.list()
      .then(({ data }) => setProducts(data))
      .catch(error => console.log(error))
  }, [])

  const renderHeader = () => {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography className="text-40 my-16 font-700" component="h1">
            Ürünler
          </Typography>
          <Button color="info" variant="contained" href='/pages/product/create'>Ürün oluştur</Button>
        </div>
        <Typography className="description">
          Tüm ürünleri listeleyebilir, yeni oluşturabilir veya varolanları düzenleyebilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Typography color="text.primary">Ürünler</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderTable = () => {
    return products && products.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ürün adı</TableCell>
              <TableCell>Ürün açıklaması</TableCell>
              <TableCell>Alerjenler</TableCell>
              <TableCell>Bağlı olduğu kategori</TableCell>
              <TableCell>Bağlı olduğu alt kategori</TableCell>
              <TableCell>Ürün fiyatı</TableCell>
              <TableCell>Oluşturulma tarihi</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell><b>{product.title}</b></TableCell>
                <TableCell>{product.description.length > 40 ? `${product.description.substring(0, 40)}..` : `${product.description}`}</TableCell>
                <TableCell>{product.allergens.substring(0, 40) || "-"}</TableCell>
                <TableCell>{product?.category?.title}</TableCell>
                <TableCell>{product?.subCategory?.title || '-'}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button href={`/pages/product/${product.id}`} color="primary">İncele</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <NoContent message="Ürün verisi bulunamadı" />
    )
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

export default Products;
