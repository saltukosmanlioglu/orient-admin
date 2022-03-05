import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import product from 'app/main/services/controller/product';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import category from 'app/main/services/controller/category';
import subCategory from 'app/main/services/controller/sub-category';
import file from 'app/main/services/controller/file';

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

function CreateProduct() {
  const [formData, setFormData] = useState({
    allergens: '',
    categoryId: 0,
    description: '',
    image: '',
    price: 0,
    subCategoryId: 0,
    title: '',
  })

  const [categories, setCategories] = useState()
  const [subCategories, setSubCategories] = useState()

  const uploadFileRef = useRef(null)
  const navigate = useNavigate()

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let multipartFormData = new FormData();
    multipartFormData.append("uploadFile", uploadFileRef.current);

    file.upload(multipartFormData)
      .then(({ data }) => {
        if (data.uploadedFilePath) {
          product.create({ ...formData, image: data.uploadedFilePath })
            .then(() => {
              navigate('/pages/products')
            })
        }
      })
      .catch(error => console.log(error))
  }

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
        <Typography className="text-40 my-16 font-700" component="h1">
          Ürün oluştur
        </Typography>
        <Typography className="description">
          Aşağıdaki alanları doldurarak yeni bir ürün oluşturabilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" href="/">Anasayfa</Button>
          <Button color="inherit" href="/pages/products">Ürünler</Button>
          <Typography color="text.primary">Ürün oluştur</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                variant="outlined"
                onChange={(e) => {
                  uploadFileRef.current = e.target.files[0]
                  console.log(uploadFileRef.current)
                }}
                type="file"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Ürün adı"
                variant="outlined"
                onChange={(e) => handleFieldChange('title', e.currentTarget.value)}
                value={formData.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Açıklama"
                variant="outlined"
                onChange={(e) => handleFieldChange('description', e.currentTarget.value)}
                value={formData.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="outlined-basic"
                label="Fiyat"
                variant="outlined"
                onChange={(e) => handleFieldChange('price', Number(e.currentTarget.value))}
                value={formData.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Alerjenler"
                variant="outlined"
                onChange={(e) => handleFieldChange('allergens', e.currentTarget.value)}
                value={formData.allergens}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Kategori</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formData.categoryId}
                  label="Kategori"
                  onChange={(e) => handleFieldChange('categoryId', e.target.value)}
                >
                  {categories && categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      value={category.id}
                      style={{ color: category.color }}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Alt kategori</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formData.subCategoryId}
                  label="Alt kategori"
                  onChange={(e) => handleFieldChange('subCategoryId', e.target.value)}
                >
                  {subCategories && subCategories.map((subCategory) => (
                    <MenuItem
                      key={subCategory.id}
                      value={subCategory.id}
                      style={{ color: subCategory.color }}
                    >
                      {subCategory.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Stack spacing={2} direction="row">
            <Button type="submit" color="info" variant="contained">Ürün oluştur</Button>
            <Button href="/pages/products" color="inherit">İptal</Button>
          </Stack>
        </div>
      </form>
    )
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="pl-60 pr-60 pt-20 pb-20">
        {renderBreadcrumb()}
        {renderHeader()}
        <div className='mt-20'>
          {renderForm()}
        </div>
      </div>
    </Root>
  );
}

export default CreateProduct;
