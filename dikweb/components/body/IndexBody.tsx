import { useState } from 'react'
import styled from 'styled-components'
import { UserProfileType } from '../../types/profile.type'
import FeedInputBox from '../feed/FeedInputBox'
import FeedPost from '../feed/FeedPost'
import Leftbar from '../sidebar/leftbar/Leftbar'
import Rightbar from '../sidebar/rightbar/Rightbar'
import { useGetPublicFeedsQuery } from '../../generated/graphql'
import FeedPostSkeleton from '../feed/FeedPostSkeleton'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

interface Props {
	profile: UserProfileType
}
interface TabPanelProps {
	children?: React.ReactNode
	index: any
	value: any
}

/**
 * @param TabPanelProps
 * @renders Global tab or Partner Tab
 */
function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tab-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{children}
		</div>
	)
}

export default function IndexBody({ profile }: Props) {
	const [value, setValue] = useState(0)
	/**
	 * Handle tab values change
	 */
	const handleTabChange = (
		_event: React.ChangeEvent<{}>,
		newValue: number
	) => {
		setValue(newValue)
	}

	/**
	 * This is a provided hook generated by graphql-codegen.
	 * @usage to query all public feeds, it also provided
	 * helper function and result like { loading, data, error, refetch. etc }
	 * @see https://www.apollographql.com/docs/react/data/queries/#options
	 */
	const publicFeedsHooks = useGetPublicFeedsQuery()

	return (
		<IndexBodyWrapper>
			{/* Sidebar => Left */}
			<Leftbar profile={profile} />

			{/* Post Feed => Middle */}
			<IndexBodyMidWrapper>
				{/* Feed Input Box */}
				<FeedInputBox
					profile={profile}
					// When user succesfully upload post, refecth/refresh feeds
					onUploadCallback={() => publicFeedsHooks.refetch()}
				/>

				{/* TABS */}
				<TabsWrapper>
					<Tabs
						value={value}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="inherit"
						centered
						variant="fullWidth"
					>
						<Tab
							label="Recommendation"
							aria-label="recommendation"
							// when tab clicked, refecth/refresh feeds
							onClick={() => publicFeedsHooks.refetch()}
						/>
						<Tab label="Your Partner" aria-label="your partner" />
					</Tabs>
				</TabsWrapper>

				<TabsPanelWrapper>
					<TabPanel value={value} index={0}>
						{/* When API calls is not ready, render Skeleton Component */}
						{publicFeedsHooks.loading ? (
							<>
								<FeedPostSkeleton />
								<FeedPostSkeleton />
								<FeedPostSkeleton />
							</>
						) : (
							[
								// When API calls is ready, map the result into FeedPost Component
								publicFeedsHooks.data?.posts.map((value) => (
									<FeedPost
										key={value.id}
										caption={value.caption}
										type={value.type as string}
										username={value.author.username}
										timestamp={value.created_at}
										avatarSrc={
											value.author.avatar_url as
												| string
												| undefined
										}
										upSum={0}
										downSum={0}
										commentSum={0}
									/>
								)),
							]
						)}
					</TabPanel>
					<TabPanel value={value} index={1}>
						{/* Feed Partner Post */}
						<h1
							style={{
								color: '#fff',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							Work in Progress...
						</h1>
					</TabPanel>
				</TabsPanelWrapper>
			</IndexBodyMidWrapper>

			{/* Sidebar => Right */}
			<Rightbar />
		</IndexBodyWrapper>
	)
}

const IndexBodyWrapper = styled.div`
	display: flex;
	margin: 28px 128px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`

const IndexBodyMidWrapper = styled.div`
	flex: 0.6;
	margin: 18px 8px;

	// how mobile should behave
	@media (max-width: 600px) {
		flex: 1;
		margin: 0;
	}
`
const TabsWrapper = styled.div`
	color: var(--font-white-800);
	margin-top: -12px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`

const TabsPanelWrapper = styled.div`
	margin-top: 18px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin-top: 8px;
	}
`
