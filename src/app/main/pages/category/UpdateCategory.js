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
    title: '',
  })

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [languageModal, setLanguageModal] = useState(false)
  const [error, setError] = useState(false)
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
    categoryLocale.update({
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

  const languages = ['ENG', 'AR']

  const renderLanguageSupport = () => {
    return (
      <div className="mt-20">

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {languages.map((lang, index) => (
              locales.find((locale) => locale.locale === lang) ? (
                <Grid key={index} xs={4}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      setActiveLanguage(lang)
                      setLanguageModal(true)
                      setLanguageModalType('update')
                      setLanguageFormData(prev => ({ ...prev, title: locales.find((locale) => locale.locale === lang).title }))
                    }}
                  >
                    {lang}: {locales.find((locale) => locale.locale === lang)?.title}
                  </Button>
                </Grid>
              ) : (
                <Grid key={index} xs={4}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                      setActiveLanguage(lang)
                      setLanguageModal(true)
                      setLanguageModalType('create')
                      setLanguageFormData({ title: '' })
                    }}
                  >
                    {lang}
                  </Button>
                </Grid>
              )
            ))}
          </Grid>
        </Box>
      </div>
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
          <Box sx={{ flexGrow: 1 }}>
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
