import FuseDialog from '@fuse/core/FuseDialog';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
import SettingsPanel from 'app/fuse-layouts/shared-components/SettingsPanel';
import clsx from 'clsx';
import { memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import LeftSideLayout from './components/LeftSideLayout';
import NavbarWrapperLayout from './components/NavbarWrapperLayout';
import RightSideLayout from './components/RightSideLayout';
import ToolbarLayout from './components/ToolbarLayout';

const useStyles = makeStyles(theme => ({
	root: {
		'&.boxed': {
			clipPath: 'inset(0)',
			maxWidth: props => `${props.config.containerWidth}px`,
			margin: '0 auto',
			boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
		},
		'&.container': {
			'& .container': {
				maxWidth: props => `${props.config.containerWidth}px`,
				width: '100%',
				margin: '0 auto'
			}
		}
	}
}));

function Layout(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const appContext = useContext(AppContext);
	const { routes } = appContext;
	const classes = useStyles({ ...props, config });

	return (
		<div id="fuse-layout" className={clsx(classes.root, config.mode, 'w-full flex')}>
			{config.leftSidePanel.display && <LeftSideLayout />}

			<div className="flex flex-auto min-w-0">
				{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout />}

				<main id="fuse-main" className="flex flex-col flex-auto min-h-screen min-w-0 relative z-10">
					{config.toolbar.display && (
						<ToolbarLayout className={config.toolbar.style === 'fixed' && 'sticky top-0'} />
					)}

					<div className="flex flex-col flex-auto min-h-0 relative z-10">
						<FuseDialog />

						<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

						{props.children}
					</div>
				</main>

				{config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout />}
			</div>

			{config.rightSidePanel.display && <RightSideLayout />}
			<FuseMessage />
		</div>
	);
}

export default memo(Layout);
