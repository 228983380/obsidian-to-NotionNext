import {i18nConfig} from "../lang/I18n";
import {App, Notice} from "obsidian";
import {Upload2NotionNext} from "./upload_next/Upload2NotionNext";
import {Upload2NotionGeneral} from "./upload_general/Upload2NotionGeneral";
import {Upload2NotionCustom} from "./upoload_custom/Upload2NotionCustom";
import {DatabaseDetails, PluginSettings} from "../ui/settingTabs";
import ObsidianSyncNotionPlugin from "../main";
import {getNowFileMarkdownContentNext} from "./upload_next/getMarkdownNext";
import {getNowFileMarkdownContentGeneral} from "./upload_general/getMarkdownGeneral";
import {getNowFileMarkdownContentCustom} from "./upoload_custom/getMarkdownCustom";

export async function uploadCommandNext(
	plugin: ObsidianSyncNotionPlugin,
	settings: PluginSettings,
	dbDetails: DatabaseDetails,
	app: App,
) {

	const {notionAPI, databaseID} = dbDetails;

	// Check if the user has set up the Notion API and database ID
	if (notionAPI === "" || databaseID === "") {
		const setAPIMessage = i18nConfig["set-api-id"];
		new Notice(setAPIMessage);
		return;
	}

	const {
		markDownData,
		nowFile,
		emoji,
		cover,
		tags,
		type,
		slug,
		stats,
		category,
		summary,
		paword,
		favicon,
		datetime
	} = await getNowFileMarkdownContentNext(app, settings)

	if (markDownData) {
		const {basename} = nowFile;

		const upload = new Upload2NotionNext(plugin, dbDetails);
		const res = await upload.syncMarkdownToNotionNext(basename, emoji, cover, tags, type, slug, stats, category, summary, paword, favicon, datetime, markDownData, nowFile, this.app);

		const {response} = res;
		if (response.status === 200) {
			new Notice(`${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`).noticeEl.style.color = "green";
			console.log(`${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`);
			// http 进行post 发送提醒
			const postResponse = await requestUrl({
				url: "https://pages-api.edgeone.ai/v1/webhook/bd468612b57ca5c79d1626a12215c11640c78894c7a8723a13682d1206fe12d4",
				//替换为你的webhook URL
				method: "POST",
				body: JSON.stringify({
					text: `${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`,
				}),
				// 替换你想要的内容
				headers: {
					"Content-Type": "application/json",
					// 按照你的api添加相应的header
				},
			});
			new Notice(`上传edgeone成功`).noticeEl.style.color = "green";
		} else {
			new Notice(`${i18nConfig["sync-fail"]} ${basename}`, 5000);
			console.log(`${i18nConfig["sync-fail"]} ${basename}`);
		}

	}
}


export async function uploadCommandGeneral(
	plugin: ObsidianSyncNotionPlugin,
	settings: PluginSettings,
	dbDetails: DatabaseDetails,
	app: App,
) {

	const {notionAPI, databaseID} = dbDetails;

	// Check if the user has set up the Notion API and database ID
	if (notionAPI === "" || databaseID === "") {
		const setAPIMessage = i18nConfig["set-api-id"];
		new Notice(setAPIMessage);
		return;
	}

	const {markDownData, nowFile, cover, tags} = await getNowFileMarkdownContentGeneral(app, settings)

	new Notice(`Start upload ${nowFile.basename}`);
	console.log(`Start upload ${nowFile.basename}`);

	if (markDownData) {
		const {basename} = nowFile;

		const upload = new Upload2NotionGeneral(plugin, dbDetails);
		const res = await upload.syncMarkdownToNotionGeneral(basename, cover, tags, markDownData, nowFile, this.app);

		const {response} = res;
		if (response.status === 200) {
			new Notice(`${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`).noticeEl.style.color = "green";
			console.log(`${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`);
			// http 进行post 发送提醒
			const postResponse = await requestUrl({
				url: "https://pages-api.edgeone.ai/v1/webhook/bd468612b57ca5c79d1626a12215c11640c78894c7a8723a13682d1206fe12d4",
				//替换为你的webhook URL
				method: "POST",
				body: JSON.stringify({
					text: `${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`,
				}),
				// 替换你想要的内容
				headers: {
					"Content-Type": "application/json",
					// 按照你的api添加相应的header
				},
			});
			new Notice(`上传edgeone成功`).noticeEl.style.color = "green";
		} else {
			new Notice(`${i18nConfig["sync-fail"]} ${basename}`, 5000);
			console.log(`${i18nConfig["sync-fail"]} ${basename}`);
		}

	}
}


export async function uploadCommandCustom(
	plugin: ObsidianSyncNotionPlugin,
	settings: PluginSettings,
	dbDetails: DatabaseDetails,
	app: App,
) {

	const {notionAPI, databaseID} = settings;

	// Check if the user has set up the Notion API and database ID
	if (notionAPI === "" || databaseID === "") {
		const setAPIMessage = i18nConfig["set-api-id"];
		new Notice(setAPIMessage);
		return;
	}

	const {markDownData, nowFile, cover, customValues} = await getNowFileMarkdownContentCustom(app, dbDetails)

	new Notice(`Start upload ${nowFile.basename}`);
	console.log(`Start upload ${nowFile.basename}`);

	if (markDownData) {
		const {basename} = nowFile;

		const upload = new Upload2NotionCustom(plugin, dbDetails);
		const res = await upload.syncMarkdownToNotionCustom(cover, customValues, markDownData, nowFile, this.app);

		const {response} = res;

		if (response.status === 200) {
			new Notice(`${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`).noticeEl.style.color = "green";
			console.log(`${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`);
			// http 进行post 发送提醒
			const postResponse = await requestUrl({
				url: "https://pages-api.edgeone.ai/v1/webhook/bd468612b57ca5c79d1626a12215c11640c78894c7a8723a13682d1206fe12d4",
				//替换为你的webhook URL
				method: "POST",
				body: JSON.stringify({
					text: `${i18nConfig["sync-preffix"]} ${basename} ${i18nConfig["sync-success"]}`,
				}),
				// 替换你想要的内容
				headers: {
					"Content-Type": "application/json",
					// 按照你的api添加相应的header
				},
			});
			new Notice(`上传edgeone成功`).noticeEl.style.color = "green";
		} else {
			new Notice(`${i18nConfig["sync-fail"]} ${basename}`, 5000);
			console.log(`${i18nConfig["sync-fail"]} ${basename}`);
		}

	}
}
