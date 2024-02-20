import {
  useAutoStore,
  useEndGameStore,
  usePostMatchStore,
  usePreMatchStore,
  useTeleopStore,
} from "../store/useDataStore";

export default function useCompiledData() {
  const { data: preMatchData } = usePreMatchStore();
  const { data: autoData } = useAutoStore();
  const { data: teleopData } = useTeleopStore();
  const { data: endGameData } = useEndGameStore();
  const { data: postMatchData } = usePostMatchStore();

  return { preMatchData, autoData, teleopData, endGameData, postMatchData };
}
