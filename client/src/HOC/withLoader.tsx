import React, {Props} from 'react';

interface withLoaderProps<T> extends Props<T> {
	loading: boolean
	[key: string]: any
}  

export default function withLoader<T>(Component: any) {
	return class extends React.Component<withLoaderProps<T>> {
		render() {
			const { loading, ...others } = this.props;
			if(loading) return <Component {...others}/>
			return (
				<div className="py-4">
					loading
				</div>
			)
		}
	}
} 