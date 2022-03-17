import * as React from 'react';
import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InfoIcon from '@mui/icons-material/Info';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import category from 'app/main/services/controller/category';
import categoryLocale from 'app/main/services/controller/category-locale';
import subCategoryService from 'app/main/services/controller/sub-category';
import productService from 'app/main/services/controller/product';
import language from 'app/main/services/controller/language';

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

function UpdateCategory() {
  const [formData, setFormData] = useState({
    color: '',
    title: '',
  })
  const [languageFormData, setLanguageFormData] = useState({
    id: 0,
    title: '',
  })
  const [languages, setLanguages] = useState([])

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [languageModal, setLanguageModal] = useState(false)
  const [error, setError] = useState(false)
  const [subCategories, setSubCategories] = useState()
  const [products, setProducts] = useState()
  const [value, setValue] = useState('1');
  const [locales, setLocales] = useState([])
  const [activeLanguage, setActiveLanguage] = useState('')
  const [languageModalType, setLanguageModalType] = useState('')

  const params = useParams()
  const navigate = useNavigate()

  const handleFieldChange = (key, value) => {
    setFormData({ ...formData, [key]: value })
  }
  const handleLangFieldChange = (key, value) => {
    setLanguageFormData({ ...languageFormData, [key]: value })
  }

  const handleDelete = () => {
    category.destroy(params.id)
      .then(() => {
        setConfirmationModal(false)
        navigate('/pages/categories')
      })
      .catch(() => {
        setError(true)
        setConfirmationModal(false)
      })
  }

  const handleLangDelete = (id) => {
    categoryLocale.destroy(id)
      .then(() => console.log('veri silindi'))
      .catch(() => {
        setError(true)
        setConfirmationModal(false)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    category.update(params.id, { ...formData })
      .then(() => navigate('/pages/categories'))
      .catch(error => {
        console.log(error)
        setError(true)
      })
  }

  const handleUpdateLangSubmit = (e) => {
    categoryLocale.update(languageFormData.id, {
      ...languageFormData,
      categoryId: Number(params.id),
      locale: activeLanguage
    })
      .then(() => {
        setLanguageFormData({ title: '' })
        setLanguageModal(false)
        categoryLocale.list({ categoryId: Number(params.id) })
          .then(({ data }) => {
            setLocales(data)
          })
          .catch((err) => console.log(err))
      })
      .catch(error => {
        console.log(error)
        setLanguageModal(false)
        setError(true)
      })
  }

  const handleLangSubmit = (e) => {
    categoryLocale.create({
      ...languageFormData,
      categoryId: Number(params.id),
      locale: activeLanguage
    })
      .then(() => {
        setLanguageFormData({ title: '' })
        setLanguageModal(false)
        categoryLocale.list({ categoryId: Number(params.id) })
          .then(({ data }) => {
            setLocales(data)
          })
          .catch((err) => console.log(err))
      })
      .catch(error => {
        console.log(error)
        setLanguageModal(false)
        setError(true)
      })
  }

  useEffect(() => {
    category.getById(params.id)
      .then(({ data }) => setFormData(data))
      .catch(error => console.log(error))
    categoryLocale.list({ categoryId: Number(params.id) })
      .then(({ data }) => setLocales(data))
      .catch((err) => console.log(err))
    language.list()
      .then(({ data }) => setLanguages(data))
      .catch((err) => console.log(err))
    subCategoryService.list({ categoryId: Number(params.id) })
      .then(({ data }) => setSubCategories(data))
      .catch(error => console.log(error))
    productService.list({ categoryId: Number(params.id) })
      .then(({ data }) => setProducts(data))
      .catch(error => console.log(error))
  }, [])

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
          <Button href="/pages/categories">Kategoriler</Button>
          <Typography color="text.primary">{formData.title}</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div className="mt-20">
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Kategori adı"
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
                  label="Renk kodu"
                  variant="outlined"
                  onChange={(e) => handleFieldChange('color', e.currentTarget.value)}
                  value={formData.color}
                />
              </Grid>
            </Grid>
          </Box>
          <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Stack spacing={2} direction="row">
              <Button type="submit" color="info" variant="contained">Güncelle</Button>
              <Button href="/pages/categories" color="inherit">İptal</Button>
            </Stack>
          </div>
        </form>
      </div>
    )
  }

  const renderLanguageSupport = () => {
    return (
      <div className="mt-20">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dil kodu</TableCell>
                <TableCell>Kategori adı</TableCell>
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {languages.map((lang, index) => (
                locales.find((locale) => locale.locale === lang.language) ? (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{lang.language}</TableCell>
                    <TableCell>{locales.find((locale) => locale.locale === lang.language)?.title}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => {
                            setActiveLanguage(lang.language)
                            setLanguageModal(true)
                            setLanguageModalType('update')
                            setLanguageFormData(prev => ({
                              ...prev,
                              id: lang.id,
                              title: locales.find((locale) => locale.locale === lang.language).title
                            }))
                          }}
                        >
                          Güncelle
                        </Button>
                        <Button onClick={() => handleLangDelete(lang.id)} color="error" variant="contained">
                          Sil
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{lang.language}</TableCell>
                    <TableCell>Oluşturulmadı</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                          setActiveLanguage(lang.language)
                          setLanguageModal(true)
                          setLanguageModalType('create')
                          setLanguageFormData(prev => ({
                            ...prev,
                            title: ''
                          }))
                        }}
                      >
                        Ekle
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const renderSubCategories = () => {
    return (
      <React.Fragment>
        <Button
          className='mb-20 float-right'
          color="info"
          variant="contained"
          href={`/pages/sub-category/create/${Number(params.id)}`}
        >
          Alt kategori oluştur
        </Button>
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
              {subCategories?.map((subCategory, index) => (
                <TableRow key={subCategory.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={{ color: subCategory.color }}><b>{subCategory.title}</b></TableCell>
                  <TableCell>{subCategory.color}</TableCell>
                  <TableCell>{subCategory.category.title}</TableCell>
                  <TableCell>{new Date(subCategory.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button href={`/pages/sub-category/${subCategory.id}`} color="primary">İncele</Button>
                    <Button
                      disabled={index === 0}
                      onClick={() =>
                        handleMove(
                          'up',
                          subCategory,
                          subCategories,
                          setSubCategories,
                          subCategoryService.reorder
                        )
                      }
                    >
                      Yukarı Taşı
                    </Button>
                    <Button
                      disabled={subCategories.length - 1 === index}
                      onClick={() =>
                        handleMove(
                          'down',
                          subCategory,
                          subCategories,
                          setSubCategories,
                          subCategoryService.reorder
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
      </React.Fragment>
    )
  }

  const renderProducts = () => {
    return (
      <React.Fragment>
        <Button
          className='mb-20 float-right'
          color="info"
          variant="contained"
          href={`/pages/product/create/${Number(params.id)}/0`}
        >
          Ürün oluştur
        </Button>
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
              {products?.map((product, index) => (
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
                    <Button
                      disabled={index === 0}
                      onClick={() =>
                        handleMove(
                          'up',
                          product,
                          products,
                          setProducts,
                          productService.reorder
                        )
                      }
                    >
                      Yukarı Taşı
                    </Button>
                    <Button
                      disabled={products.length - 1 === index}
                      onClick={() =>
                        handleMove(
                          'down',
                          product,
                          products,
                          setProducts,
                          productService.reorder
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
      </React.Fragment>
    )
  }

  const renderTab = () => {
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, i) => setValue(i)}>
              <Tab icon={<InfoIcon />} iconPosition="start" label="Bilgiler" value="1" />
              <Tab icon={<GTranslateIcon />} iconPosition="start" label="Alt kategoriler" value="2" />
              <Tab icon={<GTranslateIcon />} iconPosition="start" label="Ürünler" value="3" />
              <Tab icon={<GTranslateIcon />} iconPosition="start" label="Dil desteği" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">{renderForm()}</TabPanel>
          <TabPanel value="2">{renderSubCategories()}</TabPanel>
          <TabPanel value="3">{renderProducts()}</TabPanel>
          <TabPanel value="4">{renderLanguageSupport()}</TabPanel>
        </TabContext>
      </Box>
    )
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })

  return (
    <React.Fragment>
      <Root className="w-full flex flex-col flex-auto">
        <div className="pl-60 pr-60 pt-20 pb-20">
          {renderBreadcrumb()}
          {renderHeader()}
          {renderTab()}
        </div>
      </Root>
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
            Kategori sil
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Geçerli kategoriyi silmek istediğinizden emin misiniz ?
          </Typography>
          <div className="mt-16" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <ButtonGroup>
              <Button color="error" variant="contained" onClick={handleDelete}>Sil</Button>
              <Button color="inherit" variant="contained" onClick={() => setConfirmationModal(false)}>İptal</Button>
            </ButtonGroup>
          </div>
        </Box>
      </Modal>
      <Modal
        open={languageModal}
        onClose={() => setLanguageModal(false)}
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
            {activeLanguage} Dil desteği {languageModalType === 'update' ? 'güncelle' : 'ekle'}
          </Typography>
          <Box className='mt-20' sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-basic"
                  label="Kategori adı"
                  variant="outlined"
                  onChange={(e) => handleLangFieldChange('title', e.currentTarget.value)}
                  value={languageFormData.title}
                />
              </Grid>
            </Grid>
          </Box>
          <div className='mt-20' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Stack spacing={2} direction="row">
              <Button
                type="button"
                color="info"
                variant="contained"
                onClick={() => languageModalType === 'create'
                  ? handleLangSubmit()
                  : handleUpdateLangSubmit()
                }
              > {languageModalType === 'update' ? 'Güncelle' : 'Ekle'}</Button>
              <Button onClick={() => setLanguageModal(false)} color="inherit">İptal</Button>
            </Stack>
          </div>
        </Box>
      </Modal>
      <Snackbar style={{ width: '25%', margin: '0 30px 30px auto', position: 'static', }} open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          İşlem gerçekleşmedi
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default UpdateCategory;
