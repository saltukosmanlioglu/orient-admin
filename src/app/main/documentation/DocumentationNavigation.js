import { fuseReactLatestVersion } from './changelog/ChangelogDoc';
import FuseComponentsNavigation from './fuse-components/FuseComponentsNavigation';
import MaterialUIComponentsNavigation from './material-ui-components/MaterialUIComponentsNavigation';
import ThirdPartyComponentsNavigation from './third-party-components/ThirdPartyComponentsNavigation';

const DocumentationNavigation = {
  id: 'documentation',
  title: 'Documentation',
  type: 'group',
  icon: 'star',
  children: [
    MaterialUIComponentsNavigation,
  ],
};

export default DocumentationNavigation;
