/*global browser*/
/*global url*/

import React, { useEffect, useState, useCallback } from "react";
import loadingUrl from "./img/loading.svg";
function App() {
	const [urlData, setUrlData] = useState({});
	const [errorMessage, setErrorMessage] = useState("some error happened  ❌");
	const [loading, setLoading] = useState(true);

	const getUrl = async () => {
		let urlTab = "";
		const tabs = await browser.tabs.query({
			currentWindow: true,
			active: true,
		});
		console.log(urlTab);
		const getUrlTab = new URL(await tabs[0].url).hostname;
		
		return getUrlTab
	};

	const fetchApi = useCallback(async () => {

		try {
			setLoading(true);
			const response = await fetch(`http://ip-api.com/json/${await getUrl()}`);
			if (!response.ok)
				throw new Error(`something went wrong error ${response.status} ❌`);
			const jsonResponse = await response.json();
			setUrlData(jsonResponse);
		} catch (err) {
			setErrorMessage(err.message);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchApi();
	}, [fetchApi]);
	return (
		<div className="app">
			{loading ? (
				<img src={loadingUrl} />
			) : (
				<>
					<p> country: {urlData.country ?? errorMessage}</p>
					<p> city: {urlData.city ?? errorMessage}</p>
				</>
			)}
		</div>
	);
}

export default App;
