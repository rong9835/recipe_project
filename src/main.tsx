import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/reset.css';
import './styles/global.css';
import './styles/font.css';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: '#c9532f',
			},
		}}
	>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ConfigProvider>
);
