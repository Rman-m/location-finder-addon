/*global browser*/
/*global url*/

import React, { useEffect, useState, useCallback } from "react";
import loadingUrl from "./img/loading.svg";
function App() {
	const [urlData, setUrlData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [tabUrl, setTabUrl] = useState("");
	const [loading, setLoading] = useState(true);

	const getUrl = useCallback(() => {
		setLoading(true);
		browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
			const x = new URL(tabs[0].url).hostname;
			console.log(x);
			setTabUrl(x);
		});
	}, [setUrlData]);

	const fetchApi = useCallback(async () => {
		try {
			setLoading(true);
			if (tabUrl === "") return;
			const response = await fetch(`http://ip-api.com/json/${tabUrl}`);
			const jsonResponse = await response.json();
			if (jsonResponse.status === "fail")
				throw new Error("something went wrong");
			setUrlData(jsonResponse);
		} catch (err) {
			setErrorMessage(err.message);
		}
		setLoading(false);
	}, [tabUrl]);
	useEffect(() => {
		getUrl();
	}, [getUrl]);
	useEffect(() => {
		fetchApi();
	}, [fetchApi]);
	console.log("red");
	return (
		<div className="app">
			{loading ? (
				<img src={loadingUrl} />
			) : (
				(
					<>
						<p> country: {urlData.country}</p>
						<p> city: {urlData.city}</p>
					</>
				) ?? errorMessage
			)}
		</div>
	);
}

export default App;
