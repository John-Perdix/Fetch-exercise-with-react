import React from 'react';
import { Flex, Spin } from 'antd';

const Loading = () => {

	return (
		<Flex gap="small" vertical>
            <Flex gap="small">
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Flex>
        </Flex>
	);
};

export default Loading;