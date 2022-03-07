import * as React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InfoIcon from '@mui/icons-material/Info';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import category from 'app/main/services/controller/category';
import product from 'app/main/services/controller/product';
import subCategory from 'app/main/services/controller/sub-category';

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

function UpdateProduct() {
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

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [value, setValue] = useState('1')

  const params = useParams()
  const navigate = useNavigate()

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleDelete = () => {
    product.destroy(params.id)
      .then(() => {
        setConfirmationModal(false)
        navigate('/pages/products')
      })
      .catch(() => setConfirmationModal(false))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    product.update(params.id, { ...formData })
      .then(() => {
        navigate('/pages/products')
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

    product.getById(params.id)
      .then(({ data }) => setFormData(data))
      .catch(error => console.log(error))
  }, [])

  const renderHeader = () => {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography className="text-40 my-16 font-700" component="h1">
            {formData.title}
          </Typography>
          <Button color="error" variant="contained" onClick={() => setConfirmationModal(true)}>Sil</Button>
        </div>
        <Typography className="description">
          Geçerli kaydı düzenleyebilir veya silebilirsiniz.
        </Typography>
      </React.Fragment>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Button href="/">Anasayfa</Button>
          <Button href="/pages/products">Ürünler</Button>
          <Typography color="text.primary">{formData.title}</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div className="mt-20">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mb-20">
          <img width="50%" src={`${process.env.REACT_APP_API}file/serve/${formData.image}`} />
        </div>
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
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Fiyat"
                  variant="outlined"
                  onChange={(e) => handleFieldChange('price', e.currentTarget.value)}
                  value={formData.price}
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
              <Button type="submit" color="info" variant="contained">Güncelle</Button>
              <Button href="/pages/products" color="inherit">İptal</Button>
            </Stack>
          </div>
        </form>
      </div>
    )
  }

  const renderLanguageSupport = () => {
    return (
      <div>sa</div>
    )
  }

  const renderTab = () => {
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, i) => setValue(i)}>
              <Tab icon={<InfoIcon />} iconPosition="start" label="Bilgiler" value="1" />
              <Tab icon={<GTranslateIcon />} iconPosition="start" label="Dil desteği" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{renderForm()}</TabPanel>
          <TabPanel value="2">{renderLanguageSupport()}</TabPanel>
        </TabContext>
      </Box>
    )
  }

  return (
    <Root className="w-full flex flex-col flex-auto">
      <div className="pl-60 pr-60 pt-20 pb-20">
        {renderBreadcrumb()}
        {renderHeader()}
        {renderTab()}
      </div>
      <Modal
        open={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ürün sil
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Geçerli ürünü silmek istediğinizden emin misiniz ?
          </Typography>
          <div className="mt-16" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <ButtonGroup>
              <Button color="error" variant="contained" onClick={handleDelete}>Sil</Button>
              <Button color="inherit" variant="contained" onClick={() => setConfirmationModal(false)}>İptal</Button>
            </ButtonGroup>
          </div>
        </Box>
      </Modal>
    </Root>
  );
}

export default UpdateProduct;
